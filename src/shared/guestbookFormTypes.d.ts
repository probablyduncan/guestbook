type GuestbookEntryTemplateType = "guestbook" | "job"
    | "college" | "homestay" | "review" | "security"
    | "dating" | "snail" | "alt" | "doodle";

type GuestbookFormDataOfType<T extends GuestbookEntryTemplateType> = Omit<Extract<GuestbookFormData, { type: T }>, "type">;

type GuestbookFormData = {
    type: "guestbook";
    name: string;
    location?: string;
    url?: string;
    message: string;
} | {
    type: "job";
    name: string;
    fax: string;
    jobTitle: string;
    experience: string;
    cultureFit: string;
    gapExplanation: string;
    desiredSalary: number;
} | {
    type: "college";
    extracurriculars: {
        type: "volunteering" | "sports captain" | "small business";
        text: string;
    }[];
} | {
    type: "homestay";

} | {
    type: "dating";
    height: number;
    jumpHeight: number;

    // validation: that's too many toes!!!
    toeCount: number;

    sunday: string;
    dread: string;
    apocalypse: string;
}