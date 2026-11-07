FROM golang:1.24-alpine AS build
ARG MINIO_RELEASE=RELEASE.2025-09-07T16-13-09Z
RUN apk add --no-cache git
RUN git clone --branch "${MINIO_RELEASE}" --depth 1 https://github.com/minio/minio.git /src
WORKDIR /src
RUN CGO_ENABLED=0 go build -trimpath -tags kqueue -o /minio .

FROM alpine:3.22
RUN apk add --no-cache ca-certificates curl \
    && addgroup -S minio && adduser -S -G minio minio \
    && mkdir -p /data && chown minio:minio /data
COPY --from=build /minio /usr/local/bin/minio
USER minio
EXPOSE 9000 9001
ENTRYPOINT ["minio"]
