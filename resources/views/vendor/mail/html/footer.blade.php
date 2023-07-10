<tr>
<td>
<table class="footer" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
<tr>
    <td class="content-cell" align="center" style="padding: 32px 0px 12px;">
        <a style="font-weight: 700; color: #0ABAB5; text-decoration: none;" href="{{ config('app.url') }}">Visit website</a>
    </td>
</tr>
<tr>
<td class="content-cell" align="center">
{{ Illuminate\Mail\Markdown::parse($slot) }}
</td>
</tr>
</table>
</td>
</tr>
