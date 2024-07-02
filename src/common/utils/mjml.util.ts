import mjml2html = require('mjml')

export function generateHtml(url: string): string {
  return mjml2html(`
    <mjml>
    <mj-head>
        <mj-title>Verify Your Email</mj-title>
        <mj-preview>Click the button below to verify your email address</mj-preview>
        <mj-attributes>
        <mj-all font-family="Helvetica, Arial, sans-serif"></mj-all>
        <mj-section padding="0px"></mj-section>
        <mj-button background-color="#4CAF50" color="white"></mj-button>
        </mj-attributes>
        <mj-style inline="inline">
        .body-section { background-color: #f6f6f6; padding: 20px; }
        .content-section { background-color: #ffffff; padding: 40px; border-radius: 10px; }
        </mj-style>
    </mj-head>
    <mj-body>
        <mj-section full-width="full-width" padding="20px 0">
        <mj-column>
            <mj-image src="https://hazi-1257227661.cos.ap-nanjing.myqcloud.com/text-1719827111238.png" alt="Logo" width="250px"></mj-image>
        </mj-column>
        </mj-section>
        <mj-section css-class="body-section">
        <mj-column>
            <mj-text font-size="20px" color="#333333" font-weight="bold" align="center">
            验证你的邮箱
            </mj-text>
            <mj-text font-size="16px" color="#555555" align="center">
            感谢您注册！为了完成您的注册，请点击下方按钮确认您的电子邮件地址。
            </mj-text>
        </mj-column>
        </mj-section>
        <mj-section css-class="content-section">
        <mj-column>
            <mj-button href=${url} font-size="18px" padding="22px">
            点击验证邮箱
            </mj-button>
            <mj-text font-size="14px" color="#999999" align="center">
            如果您没有进行注册，请忽略这封邮件。
            </mj-text>
        </mj-column>
        </mj-section>
    </mj-body>
    </mjml>
    `).html
}