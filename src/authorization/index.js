const ADMIN_CAPABILITIES = {
  createContact: ['admin'],
  deleteContact: ['admin']
}

const userHasAccess = (user, action) => {
  const admin = user.admin
  const allActions = Object.keys(ADMIN_CAPABILITIES)
  if(!admin) {
    throw new Error (`User ${user.username} is not an admin!`)
  } else if (!allActions.includes(action)) {
    throw new Error (`Tried to get permissions for invalid action. Action: ${action}`)
  } else {
    const capabilities = ADMIN_CAPABILITIES[action]
    return capabilities.includes('admin')
  }
}

module.exports = { userHasAccess }
