import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import uiReducer, { type localeState } from "../../states/uiSlice";
import { LanguageToggle } from "./LanguageToggle";

const renderWithStore = (preloadedState: { ui: localeState }) => {
  const store = configureStore({
    reducer: { ui: uiReducer },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <LanguageToggle />
    </Provider>
  );
};

describe("LanguageToggle", () => {
  it("renders with EN active", () => {
    renderWithStore({ ui: { locale: "en", isAuthenticated: true } });

    expect(screen.getByText("EN")).toHaveClass("font-bold");
    expect(screen.getByText("RU")).not.toHaveClass("font-bold");
  });

  it("renders with RU active", () => {
    renderWithStore({ ui: { locale: "ru", isAuthenticated: true } });

    expect(screen.getByText("RU")).toHaveClass("font-bold");
    expect(screen.getByText("EN")).not.toHaveClass("font-bold");
  });

  it("toggles locale on click", () => {
    const storeState: { ui: localeState } = {
      ui: { locale: "en", isAuthenticated: true },
    };
    renderWithStore(storeState);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(screen.getByText("RU")).toHaveClass("font-bold");
  });
});
