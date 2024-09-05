# ベースイメージの取得
FROM registry.access.redhat.com/ubi8/nodejs-18:latest

# node.jsの利用に必要なパッケージ（ランタイム）をインストール
# RUNの後にlinuxコマンドをそのまま記載します

# コンテナ起動した後に遷移させる作業ディレクトリの設定
WORKDIR /usr/src/app

RUN npm install express mysql2 body-parser dotenv ejs


# ホストで作成済みのnode.jsアプリケーションの動作に必要なソースコード（一部）をコンテナ内の作業ディレクトリに転送
# package.jsonは、`npm init`すると作成されるものです。
COPY . .

# コンテナを立ち上げた後に発動して欲しいコマンドを記載。
CMD ["node", "index.js"]