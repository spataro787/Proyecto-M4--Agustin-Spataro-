import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "./Navbar";

vi.mock("../hooks/useAuth", () => ({
    useAuth: () => ({
        user: {
            displayName: "Agustin Spataro",
            email: "agustin@test.com",
            photoURL: null,
        },
        logout: vi.fn(),
    }),
}));

describe("Navbar", () => {
    it("muestra el nombre de la aplicación", () => {
        render(<Navbar />);

        expect(
            screen.getByText("Gestor Estratégico")
        ).toBeInTheDocument();
    });


    it("muestra el usuario autenticado", () => {
        render(<Navbar />);

        expect(
            screen.getByText("Agustin Spataro")
        ).toBeInTheDocument();
    });


    it("muestra el botón cerrar sesión", () => {
        render(<Navbar />);

        expect(
            screen.getByRole("button", {
                name: "Cerrar sesión",
            })
        ).toBeInTheDocument();
    });
});