import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
export default function Page() {
  return (
    <div className="bg-white">
      <SwaggerUI url="/openapi.yaml" />
    </div>
  );
}
