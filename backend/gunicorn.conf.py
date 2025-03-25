import os

worker_class = 'gthread'

workers = os.environ.get("WEB_CONCURRENCY", 1)

threads = 4

timeout = 20

bind = ["[::]:{}".format(os.environ.get("PORT", 5000))]