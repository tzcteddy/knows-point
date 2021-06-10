
```html
<div>
    <form action={invoicePageUrl} target='invoiceIframe' method='post' ref={this.invoiceForm}>
        <input type='hidden' name='params' value={invoiceData} />
        <input type='hidden' name='inputinfo' value={inputinfo} />
    </form>
</div>
<iframe name='invoiceIframe' title='invoiceIframe' src='' />
```