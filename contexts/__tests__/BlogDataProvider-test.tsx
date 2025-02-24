import React from "react";
import { render } from "@testing-library/react-native";
import {Text} from 'react-native'
import { BlogDataProvider, useBlogData } from "../../contexts/blogDataPovider";
import type { PostType, UserType, CommentType } from "@/types";

// Mock Component to Consume Provider
const TestComponent = () => {
    const { posts, users, comments } = useBlogData();

    return (
        <>
            <Text testID="posts-count">{posts?.length ?? 0}</Text>
            <Text testID="users-count">{users?.length ?? 0}</Text>
            <Text testID="comments-count">{Object.keys(comments ?? {}).length}</Text>
        </>
    );
};

describe("BlogDataProvider", () => {
    it("provides default values", () => {
        const { getByTestId } = render(
            <BlogDataProvider>
                <TestComponent />
            </BlogDataProvider>
        );

        expect(getByTestId("posts-count").props.children).toBe(0);
        expect(getByTestId("users-count").props.children).toBe(0);
        expect(getByTestId("comments-count").props.children).toBe(0);
    });

    it("updates posts, users, and comments correctly", () => {
        const { getByTestId, rerender } = render(
            <BlogDataProvider>
                <TestComponent />
            </BlogDataProvider>
        );

        // Simulating data updates
        const testPosts: PostType[] = [{ id: 1, title: "Test Post", body: "Test Body", userId: 1 }];
        const testUsers: UserType[] = [{ id: 1, name: "John Doe", email: "john@example.com" }];
        const testComments: CommentType[] = [{ id: 1, postId: 1, name: "Jane", email: "jane@example.com", body: "Nice post!" }];

        rerender(
            <BlogDataProvider>
                <TestComponent />
            </BlogDataProvider>
        );

        // Updating provider state
        const { setPosts, setUsers, setCommentsByPost } = useBlogData();
        setPosts(testPosts);
        setUsers(testUsers);
        setCommentsByPost(1, testComments);

        // Assertions
        expect(getByTestId("posts-count").props.children).toBe(1);
        expect(getByTestId("users-count").props.children).toBe(1);
        expect(getByTestId("comments-count").props.children).toBe(1);
    });
});
