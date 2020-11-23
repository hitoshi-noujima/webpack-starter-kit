module.exports = {
    env: {
        browser: true,
        node: true,
        es2020: true,
        jquery: true,
        jest: true,
    },
    'extends': [
        'eslint:recommended',
        'plugin:vue/essential',
    ],
    parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module',
    },
    globals: {
        Vue: false,
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'array-bracket-spacing': [2, 'never'], // 配列のカッコ内の間隔
        'block-spacing': 2, // 単一行ブロックの内側のスペースを強制
        'brace-style': 2, // ブロックは改行させない
        'comma-spacing': [2, { 'before': false, 'after': true }], // カンマの前後の間隔
        'computed-property-spacing': [2, 'never'], // 計算されたプロパティの括弧内に一定の間隔を強制
        'indent': [2, 4, { 'SwitchCase': 1 }], // jsのインデントは4
        'key-spacing': [2, { 'beforeColon': false, 'afterColon': true }], // プロパティのキーと値の間の間隔
        'object-curly-spacing': [2, 'always'], // オブジェクトの内側にスペース
        'quotes': [2, 'single'], // 文字列はシングルクオートのみ
        'semi': [2, 'always'], // セミコロンは絶対
        'keyword-spacing': 2, // キーワードの前後には適切なスペースを
        'space-before-function-paren': [2, 'never'], // 関数の括弧の前にスペースを入れない
        'space-in-parens': [2, 'never'], // かっこの中はスペースなし
        'space-infix-ops': 2, // 演算子の前後にスペース
        'func-call-spacing': [2, 'never'], // 関数とカッコはあけない(function hoge() {/** */})
        'no-mixed-spaces-and-tabs': 2, // インデントに混合スペースとタブを許可しない
        'no-multiple-empty-lines': [2, { max: 1 }], // 複数の空行を許可しません
        'no-trailing-spaces': 2, // 行の末尾に空白を許可しない
        'no-irregular-whitespace': 0, // template内で全角スペース使うとエラーになるので切ります
        'no-unused-vars': [2, { // 未飛翔の変数はエラー
            vars: 'local', // ローカルに宣言された変数が使用されていることだけをチェック
            args: 'none' // 引数はチェックしません
        }],
        // 'no-irregular-whitespace': [2, {
        //     'skipStrings': true,
        //     'skipComments': true,
        //     'skipRegExps': true,
        //     'skipTemplates': true
        // }],
        'no-multi-spaces': 2, // 無駄なスペースは削除
        'vue/html-closing-bracket-newline': [2, {
            'singleline': 'never',
            'multiline': 'always'
        }],
        'vue/html-closing-bracket-spacing': [2, {
            'selfClosingTag': 'always'
        }],
        'vue/html-indent': [2, 4, {
            'attribute': 1,
            'baseIndent': 1,
            'closeBracket': 0,
            'alignAttributesVertically': true,
        }],
        'vue/no-unused-vars': [2, {
            'ignorePattern': '^_'
        }],
    }
};
