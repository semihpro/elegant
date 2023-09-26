import React, { useState, useEffect } from "react";

export default async function MyComponent(props) {
  const data = await new Promise((resolve) => {
    setTimeout(() => resolve("test"), 2000);
  });
  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  );
}
