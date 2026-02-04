import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post(api.guidance.search.path, async (req, res) => {
    try {
      const input = api.guidance.search.input.parse(req.body);
      
      // Log the search for future analytics
      await storage.logSearch(input);

      // MOCK DATA LOGIC - Placeholder for future AI integration
      let results: { title: string; description: string; link?: string }[] = [];

      const queryLower = input.query.toLowerCase();

      if (input.type === 'job_apps') {
        results = [
          {
            title: `Junior ${input.query} Role`,
            description: "Entry level position at TechCorp. Great for recent graduates.",
            link: "#"
          },
          {
            title: `Senior ${input.query} Specialist`,
            description: "Leading industry player seeks experienced professional.",
            link: "#"
          },
          {
            title: `${input.query} Intern`,
            description: "Summer internship program with mentorship opportunities.",
            link: "#"
          }
        ];
      } else if (input.type === 'related_careers') {
        // Simple heuristic for demo purposes
        if (queryLower.includes('computer') || queryLower.includes('software')) {
           results = [
             { title: "Software Engineer", description: "Design and build software applications." },
             { title: "Data Scientist", description: "Analyze complex data to help make decisions." },
             { title: "Product Manager", description: "Oversee the development of products." }
           ];
        } else if (queryLower.includes('art') || queryLower.includes('design')) {
           results = [
             { title: "UX Designer", description: "Design user experiences for products." },
             { title: "Graphic Designer", description: "Create visual concepts to communicate ideas." },
             { title: "Art Director", description: "Manage design staff and creative vision." }
           ];
        } else {
           results = [
             { title: "Consultant", description: `Professional consultant in the field of ${input.query}.` },
             { title: "Researcher", description: `Academic or industrial research in ${input.query}.` },
             { title: "Teacher/Professor", description: `Educating others about ${input.query}.` }
           ];
        }
      } else if (input.type === 'suggest_major') {
         if (queryLower.includes('developer') || queryLower.includes('engineer')) {
            results = [
              { title: "Computer Science", description: "Study of computation, automation, and information." },
              { title: "Software Engineering", description: "Systematic application of engineering to software." },
              { title: "Mathematics", description: "Abstract science of number, quantity, and space." }
            ];
         } else if (queryLower.includes('doctor') || queryLower.includes('nurse')) {
            results = [
              { title: "Biology", description: "Study of life and living organisms." },
              { title: "Chemistry", description: "Scientific study of the properties and behavior of matter." },
              { title: "Nursing", description: "Profession focused on the care of individuals." }
            ];
         } else {
            results = [
              { title: "Business Administration", description: "Versatile degree for many corporate roles." },
              { title: "Communications", description: "Focus on how messages are created and interpreted." },
              { title: "Liberal Arts", description: "Broad education in arts and sciences." }
            ];
         }
      }

      res.json({ results });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  return httpServer;
}
