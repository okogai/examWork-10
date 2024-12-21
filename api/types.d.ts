export interface INews {
    id: number;
    title: string;
    text: string;
    image: string | null;
    created_at: string;
}

export interface IComment {
    id: number;
    post_id: number;
    author: string;
    comment: string;
    created_at: string;
}