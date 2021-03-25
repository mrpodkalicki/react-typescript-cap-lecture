export interface BookSearchRespDto {
    items: BookSearchRespItemDto[];
}

export interface BookSearchRespItemDto {
    volumeInfo: BookSearchRespVolumeInfoDto
}

interface BookSearchRespVolumeInfoDto {
    authors: string[];
    title: string;
    infoLink: string;
}