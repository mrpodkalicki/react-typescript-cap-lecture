import {UiUrlDto} from "../../dto/ui-url.dto";

export const UiUrl: {[key: string]: UiUrlDto} =  {
    SEARCH: {
        label: 'Search',
        url: '/search'
    },
    FAVORITE: {
        label: 'Favorite',
        url: '/'
    }
}