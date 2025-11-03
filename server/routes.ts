import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { chatMessageSchema, type Message, type ChatResponse } from "@shared/schema";
import { z } from "zod";

const PUBLICAI_API_URL = "https://api.publicai.co/v1/chat/completions";
const PUBLICAI_API_KEY = process.env.PUBLICAI_API_KEY;

async function callPublicAI(messages: Array<{ role: string; content: string }>): Promise<string> {
  if (!PUBLICAI_API_KEY) {
    throw new Error("PUBLICAI_API_KEY is not configured");
  }

  try {
    const response = await fetch(PUBLICAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${PUBLICAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "swiss-ai/apertus-70b-instruct",
        messages: messages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("PublicAI API error:", errorText);
      throw new Error(`PublicAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error("Invalid response format from PublicAI");
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling PublicAI:", error);
    throw error;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/conversations", async (req, res) => {
    try {
      const conversations = await storage.getAllConversations();
      res.json(conversations);
    } catch (error) {
      console.error("Get conversations error:", error);
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Failed to get conversations" 
      });
    }
  });

  app.delete("/api/conversations/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteConversation(id);
      
      if (!success) {
        return res.status(404).json({ error: "Conversation not found" });
      }
      
      res.json({ success: true });
    } catch (error) {
      console.error("Delete conversation error:", error);
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Failed to delete conversation" 
      });
    }
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const body = chatMessageSchema.parse(req.body);
      const { message, conversationId } = body;

      let currentConversationId = conversationId;
      let conversation;

      if (currentConversationId) {
        conversation = await storage.getConversation(currentConversationId);
        if (!conversation) {
          return res.status(404).json({ error: "Conversation not found" });
        }
      } else {
        const title = message.slice(0, 50) + (message.length > 50 ? "..." : "");
        conversation = await storage.createConversation(title);
        currentConversationId = conversation.id;
      }

      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: message,
        timestamp: Date.now(),
      };

      const apiMessages = conversation.messages
        .concat([userMessage])
        .map((msg) => ({
          role: msg.role,
          content: msg.content,
        }));

      await storage.addMessage(currentConversationId, userMessage);

      const aiResponse = await callPublicAI(apiMessages);

      const aiMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: aiResponse,
        timestamp: Date.now(),
      };

      await storage.addMessage(currentConversationId, aiMessage);

      const response: ChatResponse = {
        conversationId: currentConversationId,
        userMessage: userMessage,
        aiMessage: aiMessage,
      };

      res.json(response);
    } catch (error) {
      console.error("Chat error:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid request data", details: error.errors });
      }

      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Failed to process message" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
