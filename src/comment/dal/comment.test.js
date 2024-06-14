const moment = require('moment');
const CommentDataAccessLayer = require('./comment.dal');
const { capitalizeFirstLetter } = require('../../util/index');

jest.mock('../../util/index', () => ({
    capitalizeFirstLetter: jest.fn(str => str.charAt(0).toUpperCase() + str.slice(1))
}));

describe('CommentDataAccessLayer', () => {

    let commentDataAccessLayer;

    const testData = [
        [
            {
                comment_id: 1,
                commentText: "hello i am comment",
                commentCreatedAt: "2024-06-10T16:53:00Z",
                commentUpdatedAt: "2024-06-10T16:53:00Z",
                user_id: 1,
                firstName: "beta",
                lastName: "test",
                imageUrl: "ueu6njwjtrttyw2gjbyx",
                teamName: "alpha",
                team_id: 1
            },
            {
                comment_id: 2,
                commentText: "Hello again",
                commentCreatedAt: "2024-06-10T18:57:00Z",
                commentUpdatedAt: "2024-06-10T18:57:00Z",
                user_id: 1,
                firstName: "beta",
                lastName: "test",
                imageUrl: "ueu6njwjtrttyw2gjbyx",
                teamName: "alpha",
                team_id: 1
            },
            {
                comment_id: 3,
                commentText: "testing comment",
                commentCreatedAt: "2024-06-10T18:58:00Z",
                commentUpdatedAt: "2024-06-10T18:58:00Z",
                user_id: 1,
                firstName: "beta",
                lastName: "test",
                imageUrl: "ueu6njwjtrttyw2gjbyx",
                teamName: "alpha",
                team_id: 1
            }
        ],
        [
            `comment_id`,
            `commentText`,
            `commentCreatedAt`,
            `commentUpdatedAt`,
            `user_id`,
            `firstName`,
            `lastName`,
            `imageUrl`,
            `teamName`,
            `team_id`
        ]
    ];

    beforeEach(() => {
        commentDataAccessLayer = new CommentDataAccessLayer();
    });

    test('should return an empty array if data is empty', () => {
        const result = commentDataAccessLayer.toDto([]);
        expect(result).toEqual([]);
    });

    test('should return the correct DTO for given data', () => {
        const result = commentDataAccessLayer.toDto(testData);
        
        expect(result).toEqual([
            {
                id: 1,
                createdBy: "Beta Test",
                createdAt: "06/10/24 16:53",
                updatedAt: "06/10/24 16:53",
                userId: 1,
                imageUrl: "https://res.cloudinary.com/dcrzt1l89/image/upload/user/profile_images/ueu6njwjtrttyw2gjbyx",
                teamName: "alpha",
                text: "hello i am comment"
            },
            {
                id: 2,
                createdBy: "Beta Test",
                createdAt: "06/10/24 18:57",
                updatedAt: "06/10/24 18:57",
                userId: 1,
                imageUrl: "https://res.cloudinary.com/dcrzt1l89/image/upload/user/profile_images/ueu6njwjtrttyw2gjbyx",
                teamName: "alpha",
                text: "Hello again"
            },
            {
                id: 3,
                createdBy: "Beta Test",
                createdAt: "06/10/24 18:58",
                updatedAt: "06/10/24 18:58",
                userId: 1,
                imageUrl: "https://res.cloudinary.com/dcrzt1l89/image/upload/user/profile_images/ueu6njwjtrttyw2gjbyx",
                teamName: "alpha",
                text: "testing comment"
            }
        ]);
    });

    test('should format the date correctly', () => {
        const result = commentDataAccessLayer.toDto(testData);
        expect(result[0].createdAt).toBe("06/10/24 16:53");
        expect(result[0].updatedAt).toBe("06/10/24 16:53");
    });

    test('should capitalize first and last names correctly', () => {
        commentDataAccessLayer.toDto(testData);
        expect(capitalizeFirstLetter).toHaveBeenCalledWith('beta');
        expect(capitalizeFirstLetter).toHaveBeenCalledWith('test');
    });
});
