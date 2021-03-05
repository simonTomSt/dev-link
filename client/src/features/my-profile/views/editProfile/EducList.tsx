import { EducSchemaModel } from "../../models/formSchema";
import React from "react";

interface EducListProps {
  education: EducSchemaModel;
}

export default function EducList({ education }: EducListProps) {
  return (
    <div>
      <p>{education.school}</p>
      <p>{education.degree}</p>
      <p>{education.fieldOfStudy}</p>
      <p>{education.from}</p>
    </div>
  );
}
