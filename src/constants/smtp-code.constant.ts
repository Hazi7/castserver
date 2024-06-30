export enum SmtpCodeEnum {
    SYSTEM_STATUS = 211,
    HELP_MESSAGE = 214,

    // 2xx: Positive Completion reply
    SERVICE_READY = 220, // smtp服务就绪
    SERVICE_CLOSING_TRANSMISSION_CHANNEL = 221, // 服务关闭
    REQUESTED_MAIL_ACTION_OK = 250, // 请求操作成功
    USER_NOT_LOCAL_WILL_FORWARD = 251, // 用户不在本服务器上，但可以转发
    CANNOT_VRFY_USER_WILL_ACCEPT_MESSAGE = 252,

    // 3xx: Positive Intermediate reply
    START_MAIL_INPUT = 354, // 开始邮件输入

    // 4xx: Transient Negative Completion reply
    SERVICE_NOT_AVAILABLE = 421, // 服务不可用
    MAILBOX_UNAVAILABLE = 450, // 邮箱不可用
    LOCAL_ERROR_IN_PROCESSING = 451, // 本地错误
    INSUFFICIENT_SYSTEM_STORAGE = 452,

    // 5xx: Permanent Negative Completion reply
    SYNTAX_ERROR_COMMAND_UNRECOGNIZED = 500,
    SYNTAX_ERROR_IN_PARAMETERS = 501,
    COMMAND_NOT_IMPLEMENTED = 502,
    BAD_SEQUENCE_OF_COMMANDS = 503,
    COMMAND_PARAMETER_NOT_IMPLEMENTED = 504,
    MAILBOX_UNAVAILABLE_550 = 550, // 邮箱不可用
    USER_NOT_LOCAL = 551, // 用户不在本服务器上
    EXCEEDED_STORAGE_ALLOCATION = 552, // 存储空间已满
    MAILBOX_NAME_NOT_ALLOWED = 553, // 邮箱名不允许
    TRANSACTION_FAILED = 554,
    AUTHENTICATION_FAILED = 535, // 认证失败
}
  
export enum SmtpMessageEnum {
    // 1xx: Positive Preliminary reply
    SYSTEM_STATUS = 211,
    HELP_MESSAGE = 214,

    // 2xx: Positive Completion reply
    SERVICE_READY = 'smtp服务就绪', // smtp服务就绪
    SERVICE_CLOSING_TRANSMISSION_CHANNEL = 221, // 服务关闭
    REQUESTED_MAIL_ACTION_OK = '请求操作成功', // 请求操作成功
    USER_NOT_LOCAL_WILL_FORWARD = 251, // 用户不在本服务器上，但可以转发
    CANNOT_VRFY_USER_WILL_ACCEPT_MESSAGE = 252,

    // 3xx: Positive Intermediate reply
    START_MAIL_INPUT = '开始邮件输入', // 开始邮件输入

    // 4xx: Transient Negative Completion reply
    SERVICE_NOT_AVAILABLE = '服务不可用', // 服务不可用
    MAILBOX_UNAVAILABLE = '邮箱不可用', // 邮箱不可用
    LOCAL_ERROR_IN_PROCESSING = '本地错误', // 本地错误
    INSUFFICIENT_SYSTEM_STORAGE = 452,

    // 5xx: Permanent Negative Completion reply
    SYNTAX_ERROR_COMMAND_UNRECOGNIZED = 500,
    SYNTAX_ERROR_IN_PARAMETERS = 501,
    COMMAND_NOT_IMPLEMENTED = 502,
    BAD_SEQUENCE_OF_COMMANDS = 503,
    COMMAND_PARAMETER_NOT_IMPLEMENTED = 504,
    MAILBOX_UNAVAILABLE_550 = '邮箱不可用', // 邮箱不可用
    USER_NOT_LOCAL = 551, // 用户不在本服务器上
    EXCEEDED_STORAGE_ALLOCATION = 552, // 存储空间已满
    MAILBOX_NAME_NOT_ALLOWED = '邮箱名非法', // 邮箱名不允许
    TRANSACTION_FAILED = 554,
    AUTHENTICATION_FAILED = 'SMTP服务认证失败', // 认证失败
    
}

