// 定义枚举或类型
export enum SmtpStatusEnum {
    SYSTEM_STATUS = 211,
    HELP_MESSAGE = 214,
    SERVICE_READY = 220,
    SERVICE_CLOSING_TRANSMISSION_CHANNEL = 221,
    REQUESTED_MAIL_ACTION_OK = 250,
    USER_NOT_LOCAL_WILL_FORWARD = 251,
    CANNOT_VRFY_USER_WILL_ACCEPT_MESSAGE = 252,
    START_MAIL_INPUT = 354,
    SERVICE_NOT_AVAILABLE = 421,
    MAILBOX_UNAVAILABLE = 450,
    LOCAL_ERROR_IN_PROCESSING = 451,
    INSUFFICIENT_SYSTEM_STORAGE = 452,
    SYNTAX_ERROR_COMMAND_UNRECOGNIZED = 500,
    SYNTAX_ERROR_IN_PARAMETERS = 501,
    COMMAND_NOT_IMPLEMENTED = 502,
    BAD_SEQUENCE_OF_COMMANDS = 503,
    COMMAND_PARAMETER_NOT_IMPLEMENTED = 504,
    MAILBOX_UNAVAILABLE_550 = 550,
    USER_NOT_LOCAL = 551,
    EXCEEDED_STORAGE_ALLOCATION = 552,
    MAILBOX_NAME_NOT_ALLOWED = 553,
    TRANSACTION_FAILED = 554,
    AUTHENTICATION_FAILED = 535,
}
  
// 定义状态消息对象
export const SmtpStatusMessages = {
    // 1xx: Informational Replies
    [SmtpStatusEnum.SYSTEM_STATUS]: '系统正在检查您的请求...',
    [SmtpStatusEnum.HELP_MESSAGE]: '可用的SMTP命令帮助信息已准备就绪.',

    // 2xx: Success
    [SmtpStatusEnum.SERVICE_READY]: '服务已启动，准备接收邮件.',
    [SmtpStatusEnum.SERVICE_CLOSING_TRANSMISSION_CHANNEL]: '邮件传输完成，正在关闭连接.',
    [SmtpStatusEnum.REQUESTED_MAIL_ACTION_OK]: '邮件操作成功执行.',
    [SmtpStatusEnum.USER_NOT_LOCAL_WILL_FORWARD]: '收件人不在本地服务器，邮件将尝试转发.',
    [SmtpStatusEnum.CANNOT_VRFY_USER_WILL_ACCEPT_MESSAGE]: '无法验证收件人地址，但仍尝试发送邮件.',

    // 3xx: Intermediate
    [SmtpStatusEnum.START_MAIL_INPUT]: '请开始输入邮件内容.',

    // 4xx: Temporary Failures
    [SmtpStatusEnum.SERVICE_NOT_AVAILABLE]: '服务暂时不可用，请稍后重试.',
    [SmtpStatusEnum.MAILBOX_UNAVAILABLE]: '收件人邮箱暂时无法访问.',
    [SmtpStatusEnum.LOCAL_ERROR_IN_PROCESSING]: '处理过程中遇到临时错误.',
    [SmtpStatusEnum.INSUFFICIENT_SYSTEM_STORAGE]: '存储资源暂时不足，请减少邮件大小或稍后再试.',

    // 5xx: Permanent Failures
    [SmtpStatusEnum.SYNTAX_ERROR_COMMAND_UNRECOGNIZED]: '命令格式有误或未识别.',
    [SmtpStatusEnum.SYNTAX_ERROR_IN_PARAMETERS]: '命令参数格式错误.',
    [SmtpStatusEnum.COMMAND_NOT_IMPLEMENTED]: '所请求的功能尚未支持.',
    [SmtpStatusEnum.BAD_SEQUENCE_OF_COMMANDS]: '命令顺序不正确，请检查您的操作流程.',
    [SmtpStatusEnum.COMMAND_PARAMETER_NOT_IMPLEMENTED]: '指定的命令参数不支持.',
    [SmtpStatusEnum.MAILBOX_UNAVAILABLE_550]: '邮箱无法到达，可能是永久性问题.',
    [SmtpStatusEnum.USER_NOT_LOCAL]: '指定的用户不属于本服务器.',
    [SmtpStatusEnum.EXCEEDED_STORAGE_ALLOCATION]: '超出存储配额，无法接收更多邮件.',
    [SmtpStatusEnum.MAILBOX_NAME_NOT_ALLOWED]: '邮箱命名不符合规定.',
    [SmtpStatusEnum.TRANSACTION_FAILED]: '邮件发送事务未能完成.',
    [SmtpStatusEnum.AUTHENTICATION_FAILED]: 'SMTP身份验证未通过，请检查您的登录凭据.',
};