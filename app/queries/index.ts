export async function GetMonthly(m3terId: string) {
  const year = new Date().getFullYear();
  const months = Array.from({ length: 12 }, (_, i) => i); // 0–11 inclusive

  const responses = await Promise.all(
    months.map(async (month) => {
      const response = await fetch(
        `http://localhost:8080/m3ter/${m3terId}/monthly?year=${year}&month=${month}`
      );
      return response.json();
    })
  );

  return responses; // array of 12 items
}

export async function GetDaily(m3terId: string) {
  const response = await fetch(
    `https://m3terscan-api.onrender.com/m3ter/${m3terId}/daily`
  );
  const data = await response.json();
  return data;
}
