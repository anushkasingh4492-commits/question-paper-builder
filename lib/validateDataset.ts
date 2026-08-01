export function validateDataset(data: any) {
  const errors: string[] = [];

  if (!data) {
    errors.push("File is empty");
    return errors;
  }

  if (!data.schema_version) {
    errors.push("Missing schema_version");
  }

  if (!data.records && !data.chapters) {
    errors.push("No questions found");
  }

  if (
    data.records &&
    !Array.isArray(data.records)
  ) {
    errors.push("records should be an array");
  }

  if (
    data.chapters &&
    !Array.isArray(data.chapters)
  ) {
    errors.push("chapters should be an array");
  }

  return errors;
}