/**
 * This file is auto generated using 'php artisan typescript:generate'
 *
 * Changes to this file will be lost when the command is run again
 */

export type App = {
    Models: {
        Suburb: {
            id: string;
            created_at: string | null;
            updated_at: string | null;
            name: string;
            city_id: string;
            post_code_id: string;
            listings?: Array<App['Models']['Listing']> | null;
            post_code?: App['Models']['PostCode'] | null;
            city?: App['Models']['City'] | null;
            listings_count?: number | null;
        };
        PostCode: {
            id: string;
            created_at: string | null;
            updated_at: string | null;
            code: string;
            location_id: string | null;
            suburbs?: Array<App['Models']['Suburb']> | null;
            location?: App['Models']['Location'] | null;
            suburbs_count?: number | null;
        };
        Review: {
            id: string;
            created_at: string | null;
            updated_at: string | null;
            buyer_id: string | null;
            seller_id: string | null;
            stars: boolean;
            description: string;
            seller?: App['Models']['User'] | null;
            buyer?: App['Models']['User'] | null;
        };
        Country: {
            id: string;
            created_at: string | null;
            updated_at: string | null;
            name: string;
            code: string;
            cities?: Array<App['Models']['City']> | null;
            cities_count?: number | null;
        };
        City: {
            id: string;
            created_at: string | null;
            updated_at: string | null;
            name: string;
            country_id: string;
            suburbs?: Array<App['Models']['Suburb']> | null;
            country?: App['Models']['Country'] | null;
            suburbs_count?: number | null;
        };
        ListingImage: {
            id: string;
            created_at: string | null;
            updated_at: string | null;
            listing_id: string;
            title: string;
            file: string;
            disk: string;
            listing?: App['Models']['Listing'] | null;
        };
        Tag: {
            id: string;
            created_at: string | null;
            updated_at: string | null;
            title: string;
            listings?: Array<App['Models']['Listing']> | null;
            listings_count?: number | null;
        };
        UserFavourite: {
            id: number;
            created_at: string | null;
            updated_at: string | null;
            user_id: string;
            listing_id: string;
        };
        User: {
            id: string;
            created_at: string | null;
            updated_at: string | null;
            name: string;
            username: string;
            email: string;
            phone: string;
            email_verified_at: string | null;
            password: string;
            remember_token: string | null;
            is_admin: boolean;
            location_id: string | null;
            listings?: Array<App['Models']['Listing']> | null;
            purchases?: Array<App['Models']['Listing']> | null;
            seller_reviews?: Array<App['Models']['Review']> | null;
            buyer_reviews?: Array<App['Models']['Review']> | null;
            seller_chats?: Array<App['Models']['Chat']> | null;
            buyer_chats?: Array<App['Models']['Chat']> | null;
            chat_messages?: Array<App['Models']['ChatMessage']> | null;
            location?: App['Models']['Location'] | null;
            favourites?: Array<App['Models']['Listing']> | null;
            listings_count?: number | null;
            purchases_count?: number | null;
            seller_reviews_count?: number | null;
            buyer_reviews_count?: number | null;
            seller_chats_count?: number | null;
            buyer_chats_count?: number | null;
            chat_messages_count?: number | null;
            favourites_count?: number | null;
        };
        PhoneVerificationCode: {
            id: number;
            created_at: string | null;
            updated_at: string | null;
            phone_number: number;
            country_code: number;
            code: number;
            expires_at: string;
        };
        Listing: {
            id: string;
            created_at: string | null;
            updated_at: string | null;
            location_id: string | null;
            seller_id: string | null;
            buyer_id: string | null;
            title: string;
            price: number | null;
            status: string;
            sold_at: string | null;
            description: string | null;
            suburb_id: string | null;
            images?: Array<App['Models']['ListingImage']> | null;
            seller?: App['Models']['User'] | null;
            buyer?: App['Models']['User'] | null;
            suburb?: App['Models']['Suburb'] | null;
            location?: App['Models']['Location'] | null;
            watchers?: Array<App['Models']['User']> | null;
            tags?: Array<App['Models']['Tag']> | null;
            images_count?: number | null;
            watchers_count?: number | null;
            tags_count?: number | null;
        };
        Location: {
            id: string;
            created_at: string | null;
            updated_at: string | null;
            name: string;
            users?: Array<App['Models']['User']> | null;
            listings?: Array<App['Models']['Listing']> | null;
            post_codes?: Array<App['Models']['PostCode']> | null;
            users_count?: number | null;
            listings_count?: number | null;
            post_codes_count?: number | null;
        };
        Faq: {
            id: number;
            created_at: string | null;
            updated_at: string | null;
            question: string | null;
            answer: string | null;
        };
        Chat: {
            id: string;
            created_at: string | null;
            updated_at: string | null;
            buyer_id: string | null;
            seller_id: string | null;
            buyer_archived_at: string | null;
            seller_archived_at: string | null;
            seller?: App['Models']['User'] | null;
            buyer?: App['Models']['User'] | null;
        };
        ChatMessage: {
            id: string;
            created_at: string | null;
            updated_at: string | null;
            chat_id: string;
            user_id: string | null;
            read_at: string | null;
            message: string;
            chat?: App['Models']['Chat'] | null;
            user?: App['Models']['User'] | null;
        };
};

};
