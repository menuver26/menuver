import Menu from "@/models/menu";
import connectdb from "@/dbcoonect/connectdb";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const hotelSlug = searchParams.get("hotel");

    await connectdb();

    console.log("=== SEARCH DEBUG ===");
    console.log("Search query:", query);
    console.log("Hotel slug param:", hotelSlug);

    // Build filter query - search by name
    const filterQuery = {
      name: { $regex: query, $options: "i" }
    };

    // Try multiple hotel field matches
    if (hotelSlug) {
      filterQuery.$or = [
        { slug: hotelSlug },
        { hotelSlug: hotelSlug },
        { slug: hotelSlug.replace(/-/g, ' ') }, // Convert dashes to spaces
        { hotelSlug: hotelSlug.replace(/-/g, ' ') }
      ];
      console.log("Filtering by hotel slug with OR conditions");
    }

    // First, let's see all items with matching name
    const allMatching = await Menu.find({
      name: { $regex: query, $options: "i" }
    }).lean();

    console.log("All items with matching name:", allMatching.length);
    console.log("Sample items:", allMatching.slice(0, 3).map(m => ({ 
      name: m.name, 
      slug: m.slug, 
      hotelSlug: m.hotelSlug 
    })));

    // Now filter by hotel
    const results = await Menu.find(filterQuery).limit(10).lean();

    console.log("Final results after hotel filter:", results.length);
    console.log("=== END SEARCH DEBUG ===");

    return new Response(JSON.stringify(results), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Search API error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}