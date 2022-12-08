/* eslint-env browser */
module.exports =
  typeof self == 'object'
    ? self.FormData
    : typeof window != 'undefined'
    ? window.FormData
    : undefined

// This is a temporary file while waiting for a fix regarding the graphql-request package
// see https://github.com/prisma-labs/graphql-request/issues/362
