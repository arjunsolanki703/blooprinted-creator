export function setEmailTemplates(state, value) {
  state.emailTemplates = value
}
export function setTemplateTokens(state, value) {
  state.templateTokens = value
}
export function setEmailTemplateForEdit(state, value) {
  state.emailTemplate = { ...value }
}
