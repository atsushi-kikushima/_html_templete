// JavaScript Jquery PlugIns Document


/*

 * Translated default messages for the jQuery validation plugin.
 * Language: JA
 * Skipped date/dateISO/number.

 */


$.extend($.validator.messages, {
	required: '必須項目です',
	maxlength: $.validator.format('{0} 文字以下を入力してください'),
	minlength: $.validator.format('{0} 文字以上を入力してください'),
	rangelength: $.validator.format('{0} 文字以上 {1} 文字以下で入力してください'),
	email: 'メールアドレスを入力してください',
	url: 'URLを入力してください',
	dateISO: '日付を入力してください',
	number: '有効な数字を入力してください',
	digits: '0-9までを入力してください',
	equalTo: '同じ値を入力してください',
	range: $.validator.format(' {0} から {1} までの値を入力してください'),
	max: $.validator.format('{0} 以下の値を入力してください'),
	min: $.validator.format('{0} 以上の値を入力してください'),
	creditcard: 'クレジットカード番号を入力してください'
});


/*
* validate method plugin for the $ validation plugin.
* Language: JA
*/


//全角ひらがな･カタカナのみ
$.validator.addMethod('kana', function(value, element) {
	return this.optional(element) || /^([ァ-ヶーぁ-ん]+)$/.test(value);
	}, '全角ひらがな･カタカナを入力してください'
);

//全角ひらがなのみ
$.validator.addMethod('hiragana', function(value, element) {
	return this.optional(element) || /^([ぁ-ん]+)$/.test(value);
	}, '全角ひらがなを入力してください'
);

//全角カタカナのみ
$.validator.addMethod('katakana', function(value, element) {
	return this.optional(element) || /^([ァ-ヶー]+)$/.test(value);
	}, '全角カタカナを入力してください'
);

//半角カタカナのみ
$.validator.addMethod('hankana', function(value, element) {
	return this.optional(element) || /^([ｧ-ﾝﾞﾟ]+)$/.test(value);
	}, '半角カタカナを入力してください'
);

//半角アルファベット（大文字･小文字）のみ
$.validator.addMethod('alphabet', function(value, element) {
	return this.optional(element) || /^([a-zA-Z0-9\s\@_\.\-]+)$/.test(value);
	}, '半角英字を入力してください'
);

//半角アルファベット（大文字･小文字）もしくは数字のみ
$.validator.addMethod('alphanum', function(value, element) {
	return this.optional(element) || /^([a-zA-Z0-9]+)$/.test(value);
	}, '半角英数字を入力してください'
);

//郵便番号（例:012-3456）
$.validator.addMethod('postnum', function(value, element) {
	return this.optional(element) || /^¥d{3}¥-¥d{4}$/.test(value);
	}, '郵便番号を入力してください（例:123-4567）'
);

//携帯番号（例:010-2345-6789）
$.validator.addMethod('mobilenum', function(value, element) {
	return this.optional(element) || /^0¥d0-¥d{4}-¥d{4}$/.test(value);
	}, '携帯番号を入力してください（例:010-2345-6789）'
);

//電話番号（例:012-345-6789）
$.validator.addMethod('telnum', function(value, element) {
	return this.optional(element) || /^[0-9-]{12}$/.test(value);
	}, '電話番号を入力してください（例:012-345-6789）'
);