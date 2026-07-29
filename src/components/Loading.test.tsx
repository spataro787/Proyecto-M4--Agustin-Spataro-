import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Loading from "./Loading";

describe("Loading", () => {
    it("renderiza el mensaje por defecto", () => {
        render(<Loading />);

        expect(screen.getByText("Cargando...")).toBeInTheDocument();
    });

    it("renderiza un mensaje personalizado", () => {
        render(<Loading message="Cargando tareas..." />);

        expect(screen.getByText("Cargando tareas...")).toBeInTheDocument();
    });

    it("aplica la clase fullscreen cuando corresponde", () => {
        const { container } = render(<Loading fullScreen />);

        expect(
            container.querySelector(".loading-container.fullscreen")
        ).toBeTruthy();
    });
});