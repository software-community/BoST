export function cleanMongoDoc(doc) {
  if (!doc || typeof doc !== "object") return doc;

  if (Array.isArray(doc)) {
    return doc.map(cleanMongoDoc);
  }

  const result = {};

  for (const key in doc) {
    const value = doc[key];

    if (value instanceof Date) {
      result[key] = value.toISOString();
    } else if (value && typeof value === "object" && value._bsontype === "ObjectId") {
      result[key] = value.toString();
    } else if (typeof value === "object") {
      result[key] = cleanMongoDoc(value);
    } else {
      result[key] = value;
    }
  }

  // Replace _id with id
  if (result._id) {
    result.id = result._id.toString();
    delete result._id;
  }

  return result;
}
