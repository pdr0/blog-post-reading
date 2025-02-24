import React, { createContext, ReactNode, useContext, useState } from "react";
import type { PostType, CommentType, UserType } from '@/types';

type CommentsType = Record<number, CommentType[]>
type PostsByUserType = Record<number, PostType[]>

type BlogDataContextType = {
    posts: PostType[] | undefined;
    users: UserType[] | undefined;
    comments: CommentsType | undefined;
    postsByUser: PostsByUserType | undefined;
    setPosts: (posts: PostType[]) => void;
    setUsers: (users: UserType[]) => void;
    setCommentsByPost: (postId: number, commentsByPost: CommentType[]) => void;
    setPostsByUser: (postsByUser: PostsByUserType) => void;
};

export const BlogDataContext = createContext<BlogDataContextType | null>(null);

export const BlogDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [posts, setPosts] = useState<PostType[] | undefined>(undefined);
    const [users, setUsers] = useState<UserType[] | undefined>(undefined);
    const [comments, setComments] = useState<CommentsType | undefined>(undefined);
    const [postsByUser, setPostsByUser] = useState<PostsByUserType | undefined>(undefined)

    const setCommentsByPost = (postId: number, commentsByPost: CommentType[]) => {
        setComments(prevComments => ({
            ...prevComments,
            [postId]: commentsByPost
        }));
    };



    const value = { posts, users, comments, setPosts, setUsers, setCommentsByPost, setPostsByUser, postsByUser };

    return <BlogDataContext.Provider value={value}>{children}</BlogDataContext.Provider>;
};

export const useBlogData = (): BlogDataContextType => {
    const context = useContext(BlogDataContext);
    if (!context) {
        throw new Error("useBlogData must be used within a BlogDataProvider");
    }
    return context;
};
