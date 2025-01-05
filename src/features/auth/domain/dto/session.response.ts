import { SafeApiProperty } from '@core/http/rest/safe-api-property';

export class SessionResponse {
    @SafeApiProperty({
        type: 'string',
        example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    })
    accessToken: string;
    @SafeApiProperty({
        type: 'string',
        example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMnNkMzQ1Njc4OTAiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.xTfwmjhKvWK56bANGGMC2o8E8AtlLu38MXbl4vSArcU',
    })
    refreshToken: string;
}
