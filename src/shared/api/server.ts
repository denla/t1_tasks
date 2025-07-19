import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import { supabase } from "./supabaseClients";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/tasks", async (res: Response) => {
  const { data } = await supabase.from("tasks").select("*");
  res.send(data);
});

app.get("/tasks/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data } = await supabase
    .from("tasks")
    .select("*")
    .eq("id", id)
    .single();
  res.send(data);
});

app.post("/tasks", async (req: Request, res: Response) => {
  const task = req.body;
  const { data } = await supabase.from("tasks").insert([task]).select();
  res.send(data?.[0]);
});

app.patch("/tasks/:id", async (req: Request, res: Response) => {
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

  //   if (error) {
  //     return res.status(500).json({ message: "Ошибка при обновлении", error });
  //   }

  //   if (!data || data.length === 0) {
  //     return res.status(404).json({ message: "Задача не найдена" });
  //   }

  //   res.json(data[0]);
  res.send(data);
});

app.delete("/tasks/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { error } = await supabase.from("tasks").delete().eq("id", id);
  res.send(error);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
