const css = `

`;

const verifyEmailAddress = (token, email) => {
	return (
		`
		${css}
		<table cellpadding="0" cellspacing="0" border="0" id="backgroundTable" style="margin:0; padding:0; width:100% !important; line-height: 100% !important; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"
			width="100%">
			<tr>
				<td width="10" valign="top">&nbsp;</td>
				<td valign="top" align="center">
				<!--[if (gte mso 9)|(IE)]>
					<table width="600" align="center" cellpadding="0" cellspacing="0" border="0" style="background-color: #FFF; border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;">
					<tr>
						<td>
						<![endif]-->
						<table cellpadding="0" cellspacing="0" border="0" align="center" style="width: 100%; max-width: 600px; background-color: #FFF; border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;"
						id="contentTable">
						<tr>
							<td width="600" valign="top" align="center" style="border-collapse:collapse;">
							<table align='center' border='0' cellpadding='0' cellspacing='0' style='border: 1px solid #E0E4E8;'
							width='100%'>
								<tr>
								<td align='left' style='padding: 56px 56px 28px 56px;' valign='top'>
									<div style='font-family: "lato", "Helvetica Neue", Helvetica, Arial, sans-serif; line-height: 28px;font-size: 18px; color: #333;font-weight:bold;'>Hey There!</div>
								</td>
								</tr>
								<tr>
								<td align='left' style='padding: 0 56px 28px 56px;' valign='top'>
									<div style='font-family: "lato", "Helvetica Neue", Helvetica, Arial, sans-serif; line-height: 28px;font-size: 18px; color: #333;'>Please click the following link to confirm that <strong>${email}</strong> is
									your email address and you created an account with us. If you did not, simply ignore this email</div>
								</td>
								</tr>
								<tr>
								<td align='left' style='padding: 0 56px;' valign='top'>
									<div>
									<!--[if mso]>
										<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"
										href="#"
										style="height:44px;v-text-anchor:middle;width:250px;" arcsize="114%" stroke="f"
										fillcolor="#E15718">
										<w:anchorlock/>
										<![endif]-->
										<a style="background-color:#E15718;border-radius:50px;color:#ffffff;display:inline-block;font-family: &#39;lato&#39;, &#39;Helvetica Neue&#39;, Helvetica, Arial, sans-serif;font-size:18px;line-height:44px;text-align:center;text-decoration:none;width:250px;-webkit-text-size-adjust:none;"
										href="http://localhost:3001/verify/${token}">Confirm Your Account</a>
										<!--[if mso]>
										</v:roundrect>
									<![endif]-->
									</div>
								</td>
								<tr>
									<td align='left' style='padding: 28px 56px 28px 56px;' valign='top'></td>
								</tr>
								</tr>
							</table>
							</td>
						</tr>
						</table>
						<!--[if (gte mso 9)|(IE)]>
						</td>
					</tr>
					</table>
				<![endif]-->
				</td>
				<td width="10" valign="top">&nbsp;</td>
			</tr>
		</table>
		`
	)
}

module.exports = verifyEmailAddress;