## 1. Current situation

As of 13 Oct 2026, the generative AI features of the Audit Cockpits **platform** are **not active** in
production: no AI provider is configured. The code provides for two support functions, still without a
user screen: gap analysis with an explanatory narrative, and control suggestions (which answer "not
available" until semantic search exists).

On the **corporate website**, the news section (ISO Radar) uses AI to draft summaries of public news about
standards, reviewed by a person before publication. No personal data is used.

## 2. Principles (apply to any future activation)

1. **AI as a copilot:** AI suggests and explains; it **never makes compliance decisions**, does not approve
   evidence, does not change control status and does not change the score.
2. **Human action:** AI runs only when a user asks, and the result is presented as a suggestion.
3. **Transparency:** AI-generated content is labelled as such in the interface.
4. **Traceability:** each call records the request and the response, with model and usage, for 2 years.
5. **Minimisation:** only what is needed is sent to the provider; sensitive data is not sent.
6. **No training on customer data:** the contracted provider may not use the data sent to train models.
7. **Customer plan and choice:** AI works only for customers whose plan includes it.
8. **Before activation:** DPIA (procedure), adding the provider to the subprocessor list
   with the notice required by the DPA, and updating the Privacy Policy.

## 3. AI Act classification

The planned functions support compliance documentation and make no automated decisions about people. Our
preliminary assessment is that they are not **high-risk** systems (AI Act, Annex III); the transparency
obligations of art. 50 apply where there is interaction or generated content.

## 4. Internal use of AI in development

The company uses AI agents to develop the software. They do not receive secrets or customer data, and all
their changes go through human review and approval
(Secure Development).

## 5. Contact

Questions and requests for human review: **dpo@auditcockpits.com**.
