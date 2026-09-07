import { createRequest } from 'backend/airtable';

export async function wixForms_onFormSubmit(event) {

    const submission = event;

        const requestData = {
            name: submission.fields.find(field => field.fieldKey === "first_name")?.value,
            email: submission.fields.find(field => field.fieldKey === "email_d952")?.value,
            phone: submission.fields.find(field => field.fieldKey === "phone_99ad")?.value,
            county: submission.fields.find(field => field.fieldKey === "county")?.value,
            householdsize: submission.fields.find(field => field.fieldKey === "household_size_1")?.value,
            assistanceType: submission.fields.find(field => field.fieldKey === "what_kind_of_help_do_you_need")?.value,
            description: submission.fields.find(field => field.fieldKey === "tell_us_whats_going_on_as_much_detail_as_you_d_like")?.value,
            urgency: submission.fields.find(field => field.fieldKey === "how_urgent_is_this_1")?.value
        };

    await createRequest(requestData);
}