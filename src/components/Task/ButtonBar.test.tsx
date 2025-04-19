import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ButtonBar } from "./ButtonBar";

describe("Button Bar", () => {
  afterEach(cleanup);

  it("should render", () => {
    render(
      <ButtonBar
        disabled={true}
        onCancel={() => {}}
        onApply={() => {}}
        newComp={true}
        edited={false}
      />
    );
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(5);
    const actionButtons = screen.getAllByRole("action");
    expect(actionButtons).toHaveLength(3); //Contamos el boton movil
  });

  it("should render disabled and enable with prop", () => {
    render(
      <ButtonBar
        disabled={true}
        onCancel={() => {}}
        onApply={() => {}}
        newComp={true}
        edited={false}
      />
    );
    const button = screen.getAllByRole("button");
    button.forEach((btn) => {
      expect(btn).property("disabled", true);
    });
    const actionButtons = screen.getAllByRole("action");
    actionButtons.forEach((btn) => {
      expect(btn).property("disabled", false);
    });
    cleanup();
    render(
      <ButtonBar
        disabled={false}
        onCancel={() => {}}
        onApply={() => {}}
        newComp={true}
        edited={false}
      />
    );
    const buttonEnable = screen.getAllByRole("button");
    buttonEnable.forEach((btn) => {
      expect(btn).property("disabled", false);
    });
    const actionButtonEnable = screen.getAllByRole("action");
    actionButtonEnable.forEach((btn) => {
      expect(btn).property("disabled", false);
    });
  });

  it("applies correct classes and attributes", () => {
    render(
      <ButtonBar
        disabled={false}
        onCancel={() => {}}
        onApply={() => {}}
        newComp={true}
        edited={false}
      />
    );
  });
});
