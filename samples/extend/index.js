const { middleware, protect } = require('./extend')

const testToken = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJmOWY2ZDRiZC03YzYyLTRhMTktOWQ0Yi02NjU3ZDc3ODUwMjYiLCJleHAiOjE1ODAyMzQ3OTQsIm5iZiI6MCwiaWF0IjoxNTU1NTk4NTYyLCJpc3MiOiJodHRwczovL2tleWNsb2FrLmRldmVsb3AuY29tL2F1dGgvcmVhbG1zL2NsaWVudC1hcHAiLCJhdWQiOlsicmVhbG0tbWFuYWdlbWVudCIsImNsaWVudC1hcHAiLCJhY2NvdW50Il0sInN1YiI6IjlhNzc4ZDg1LThiY2YtNDczMC05ZTUxLTgzNzg5OWFlYWFmYSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImNsaWVudC1hcHAiLCJub25jZSI6ImM1Y2E5Njc3LTcxOGMtNGVmNi04MWI4LTI0NDRmYjk1MzA2NyIsImF1dGhfdGltZSI6MCwic2Vzc2lvbl9zdGF0ZSI6ImJkZjkyYWZmLTBjNjQtNDQ1NS04N2QyLTYwN2YzMDQ5NzA0MCIsImFjciI6IjAiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDo4MDgwIiwiaHR0cHM6Ly9jbGllbnQtYXBwLmRldmVsb3AudmNjLm90b25vbW91c21vYmlsaXR5LmNvbSIsImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMSIsImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiXX0sInJlc291cmNlX2FjY2VzcyI6eyJyZWFsbS1tYW5hZ2VtZW50Ijp7InJvbGVzIjpbInZpZXctcmVhbG0iLCJpbXBlcnNvbmF0aW9uIiwicmVhbG0tYWRtaW4iLCJjcmVhdGUtY2xpZW50IiwibWFuYWdlLXVzZXJzIiwicXVlcnktcmVhbG1zIiwidmlldy1hdXRob3JpemF0aW9uIiwicXVlcnktY2xpZW50cyIsInF1ZXJ5LXVzZXJzIiwibWFuYWdlLWV2ZW50cyIsIm1hbmFnZS1yZWFsbSIsInZpZXctZXZlbnRzIiwidmlldy11c2VycyIsInZpZXctY2xpZW50cyIsIm1hbmFnZS1hdXRob3JpemF0aW9uIiwibWFuYWdlLWNsaWVudHMiLCJxdWVyeS1ncm91cHMiXX0sImNsaWVudC1hcHAiOnsicm9sZXMiOlsic3lzLWFkbWluIiwidXNlciJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiSm9obiBEb2UiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJqb2huIiwiZ2l2ZW5fbmFtZSI6IkpvaG4iLCJmYW1pbHlfbmFtZSI6IkRvZSIsImVtYWlsIjoiam9obi5kb2VAa2V5Y2xvYWtfY29ubmVjdF9yb2xlcy5jb20ifQ.qiOzcQ7MLQVyjz4a2Pkf1WSJRQW_SQdsMeh5vQ1hOcc'

const req = {
  headers: {
    authorization: testToken
  }
}

middleware(req, null, () => {
  console.log(req.auth.isSysAdmin())
})

middleware(req, null, () => {
  console.log(req.auth.isReviewer())
})

// Here protect middleware will assert because sys-admin is a valid role in the jwt
middleware(req, null, () => {
  protect(['sys-admin'])(req, null, (err) => {
    if (!err) { console.log('sys-admin role verify') }
  })
})

// Here protect middleware will complete with a forbiden error, because reviewer is not in the jwt
middleware(req, null, () => {
  protect(['reviewer'])(req, null, (err) => {
    if (!err) { console.log('reviewer role verify') }
    console.error(err)
  })
})
