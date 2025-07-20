import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import { supabase } from "./supabaseClients";

const app = express();
// const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/tasks", async (req: Request, res: Response) => {
  const { title } = req.query;
  let query = supabase.from("tasks").select("*");
  if (title) {
    query = query.ilike("title", `%${title}%`);
  }
  const { data, error } = await query;
  if (error) {
    console.error(error);
    return res.status(500).json({ message: "Error", error });
  }
  res.json(data);
});

app.get("/api/tasks/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return res.status(500).json({ message: "Error", error });
  }

  res.send(data);
});

app.post("/api/tasks", async (req: Request, res: Response) => {
  const task = req.body;
  const { data } = await supabase.from("tasks").insert([task]).select();
  res.send(data?.[0]);
});

app.patch("/api/tasks/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = req.body;

  const { data } = await supabase
    .from("tasks")
    .update({
      title: updated.title,
      description: updated.description,
      category: updated.category,
      status: updated.status,
      priority: updated.priority,
    })
    .eq("id", id)
    .select();

  res.send(data);
});

app.delete("/api/tasks/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { error } = await supabase.from("tasks").delete().eq("id", id);
  res.send(error);
});

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

export default app;
