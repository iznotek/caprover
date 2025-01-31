type IAllAppDefinitions = IHashMapGeneric<IAppDef>

interface IAppEnvVar {
    key: string
    value: string
}

interface IAppVolume {
    containerPath: string
    volumeName?: string
    hostPath?: string
    mode?: string
}

interface IAppPort {
    containerPort: number
    hostPort: number
    protocol?: 'udp' | 'tcp'

    publishMode?: 'ingress' | 'host'
}

enum RepoType {
    git = 'git',
    fossil = 'fossil',
}
interface RepoInfo {
    type: RepoType
    repo: string
    branch: string
    user: string
    sshKey?: string
    password: string
}

interface RepoInfoEncrypted {
    type: RepoType
    repo: string
    branch: string
    user: string
    sshKeyEncrypted?: string
    passwordEncrypted: string
}

interface IAppVersion {
    version: number
    deployedImageName?: string // empty if the deploy is not completed
    deployedDockerFile?: string // empty if the deploy is not completed
    timeStamp: string
    vcsHash: string | undefined
}

interface IAppCustomDomain {
    publicDomain: string
    hasSsl: boolean
}

interface IAppDefinitionBase {
    enabled: boolean
    description: string
    deployedVersion: number
    notExposeAsWebApp: boolean
    hasPersistentData: boolean
    hasDefaultSubDomainSsl: boolean
    containerHttpPort?: number
    captainDefinitionRelativeFilePath: string
    buildNoCache: boolean
    forceSsl: boolean
    websocketSupport: boolean
    nodeId?: string
    instanceCount: number
    preDeployFunction?: string
    serviceUpdateOverride?: string
    customNginxConfig?: string
    networks: string[]
    customDomain: IAppCustomDomain[]
    ports: IAppPort[]
    volumes: IAppVolume[]
    envVars: IAppEnvVar[]
    versions: IAppVersion[]
    appDeployTokenConfig?: AppDeployTokenConfig
}

interface IHttpAuth {
    user: string
    password?: string
    passwordHashed?: string
}

interface AppDeployTokenConfig {
    enabled: boolean
    appDeployToken?: string
}

interface IAppDef extends IAppDefinitionBase {
    appPushWebhook?: {
        tokenVersion: string
        repoInfo: RepoInfo
        pushWebhookToken: string
    }
    httpAuth?: IHttpAuth
    appName?: string
    isAppBuilding?: boolean
}

interface IAppDefSaved extends IAppDefinitionBase {
    appPushWebhook:
        | {
              tokenVersion: string
              repoInfo: RepoInfoEncrypted
              pushWebhookToken: string
          }
        | undefined

    httpAuth?: {
        user: string
        passwordHashed: string
    }
}
