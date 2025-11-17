const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

// ---------- TYPES ----------
export type ChatMessageDTO = {
  role: "user" | "assistant";
  content: string;
};

export type CropInput = {
  N: number;
  P: number;
  K: number;
  temperature: number;
  humidity: number;
  ph: number;
  rainfall: number;
};

export type FertilizerInput = {
  temperature: number;
  humidity: number;
  moisture: number;
  N: number;
  P: number;
  K: number;
  ph: number;
};

export type DiseaseResult = {
  disease: string;
  confidence: number;
};

// ---------- API CALLS ----------
export async function predictCrop(input: CropInput) {
  const res = await fetch(`${API_BASE_URL}/api/crop`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    throw new Error("Crop prediction failed");
  }

  return res.json() as Promise<{
    crop: string;
    top3: { crop: string; confidence: number }[];
  }>;
}

export async function predictFertilizer(input: FertilizerInput) {
  const res = await fetch(`${API_BASE_URL}/api/fertilizer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    throw new Error("Fertilizer prediction failed");
  }

  return res.json() as Promise<{ fertilizer: string }>;
}

export async function detectDisease(file: File) {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${API_BASE_URL}/api/disease`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Disease detection failed");
  }

  return res.json() as Promise<DiseaseResult>;
}

export async function chatWithAssistant(
  message: string,
  history: ChatMessageDTO[]
) {
  const res = await fetch(`${API_BASE_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history }),
  });

  if (!res.ok) {
    throw new Error("Chat request failed");
  }

  return res.json() as Promise<{ reply: string }>;
}
