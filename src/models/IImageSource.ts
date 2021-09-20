interface IImageSource {
    uploadedTarPathSource?: { uploadedTarPath: string; vcsHash: string }
    captainDefinitionContentSource?: {
        captainDefinitionContent: string
        vcsHash: string
    }
    repoInfoSource?: RepoInfo
}
