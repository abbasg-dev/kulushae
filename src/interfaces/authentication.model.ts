export class SocialAuth {
    name?: string;
    icon?: JSX.Element;
    url?: string;
    method?: string;
};

export class EmailCredentials {
    email?: string;
    password?: string;
}

export class PhoneCredentials {
    phoneNumber?: string;
    password?: string;
}

export class RegisterByEmail {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
}

export class RegisterByPhoneNumber {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    password?: string;
    key?: string;
}

export class OtpData {
    pin?: string;
}

export class ForgetPassProps {
    email?: string;
    phoneNumber?: string;
}

export class CreatePassProps {
    newPassword?: string;
    confirmPassword?: string;
}