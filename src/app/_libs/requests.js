const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// Get all properties
async function getProperties() {
  try {
    // If domain was not available:
    if (!apiDomain) {
      return [];
    }

    const res = await fetch(`${apiDomain}/properties`);

    if (!res.ok) throw new Error("Failed to fetch properties.");

    return res.json();
  } catch (err) {
    console.log(err);
    return [];
  }
}

// Get a single property
async function getProperty(id) {
  try {
    // If domain was not available:
    if (!apiDomain) {
      return null;
    }

    const res = await fetch(`${apiDomain}/properties/${id}`);

    if (!res.ok) throw new Error("Failed to fetch properties.");

    return res.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}

export { getProperties, getProperty };
