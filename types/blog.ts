export interface IBlog {
    uniqueId: string
    imageUrl: string;
    title: string;
    date: string | null;
    description: string;
}
export interface IFeatureBlog {
    id: string;
    imageUrl: string;
    title: string
}