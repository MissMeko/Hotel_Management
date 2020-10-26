export interface UserModel {
    id?;
    firstName;
    lastName;
    email;
    phoneNumber;
    password;
    userType;
};

export interface RoomModel {
    id?;
    roomType;
    description;
    imageName;
    number;
    price;
    rating;
    userId;
    startDate;
    endDate;
    showBookingForm?;
    totalPricing?;
};