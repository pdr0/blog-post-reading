import React from "react";
import { render } from "@testing-library/react-native";
import Comment from "@/components/Comment";

describe("Comment Component", () => {
    it("renders the comment with correct name, body, and email", () => {
        const { getByText } = render(
            <Comment name="John Doe" body="This is a test comment" email="john@example.com" />
        );

        expect(getByText("John Doe:")).toBeTruthy();
        expect(getByText("This is a test comment")).toBeTruthy();
        expect(getByText("john@example.com")).toBeTruthy();
    });
});
