// Currently unused code.

/*

static DEFINE_RWLOCK(adfs_dir_lock);

static int
adfs_readdir(struct file *file, struct dir_context *ctx)
{
	struct inode *inode = file_inode(file);
	struct super_block *sb = inode->i_sb;
	const struct adfs_dir_ops *ops = ADFS_SB(sb)->s_dir;
	struct object_info obj;
	struct adfs_dir dir;
	int ret = 0;

	if (ctx->pos >> 32)
		return 0;

	ret = ops->read(sb, inode->i_ino, inode->i_size, &dir);
	if (ret)
		return ret;

	if (ctx->pos == 0) {
		if (!dir_emit_dot(file, ctx))
			goto free_out;
		ctx->pos = 1;
	}
	if (ctx->pos == 1) {
		if (!dir_emit(ctx, "..", 2, dir.parent_id, DT_DIR))
			goto free_out;
		ctx->pos = 2;
	}

	read_lock(&adfs_dir_lock);

	ret = ops->setpos(&dir, ctx->pos - 2);
	if (ret)
		goto unlock_out;
	while (ops->getnext(&dir, &obj) == 0) {
		if (!dir_emit(ctx, obj.name, obj.name_len,
			    obj.file_id, DT_UNKNOWN))
			break;
		ctx->pos++;
	}

unlock_out:
	read_unlock(&adfs_dir_lock);

free_out:
	ops->free(&dir);
	return ret;
}

int
adfs_dir_update(struct super_block *sb, struct object_info *obj, int wait)
{
	int ret = -EINVAL;
#ifdef CONFIG_ADFS_FS_RW
	const struct adfs_dir_ops *ops = ADFS_SB(sb)->s_dir;
	struct adfs_dir dir;

	printk(KERN_INFO "adfs_dir_update: object %06X in dir %06X\n",
		 obj->file_id, obj->parent_id);

	if (!ops->update) {
		ret = -EINVAL;
		goto out;
	}

	ret = ops->read(sb, obj->parent_id, 0, &dir);
	if (ret)
		goto out;

	write_lock(&adfs_dir_lock);
	ret = ops->update(&dir, obj);
	write_unlock(&adfs_dir_lock);

	if (wait) {
		int err = ops->sync(&dir);
		if (!ret)
			ret = err;
	}

	ops->free(&dir);
out:
#endif
	return ret;
}

static int
adfs_match(const struct qstr *name, struct object_info *obj)
{
	int i;

	if (name->len != obj->name_len)
		return 0;

	for (i = 0; i < name->len; i++) {
		char c1, c2;

		c1 = name->name[i];
		c2 = obj->name[i];

		if (c1 >= 'A' && c1 <= 'Z')
			c1 += 'a' - 'A';
		if (c2 >= 'A' && c2 <= 'Z')
			c2 += 'a' - 'A';

		if (c1 != c2)
			return 0;
	}
	return 1;
}

*/

const config = require("../config.json");

/*

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore 
et dolore magna aliqua. Rhoncus urna neque viverra justo nec ultrices dui. Vel facilisis volutpat es
t velit egestas dui. Iaculis nunc sed augue lacus viverra vitae congue eu. Sed odio morbi quis commo
do. Pretium viverra suspendisse potenti nullam. Pretium fusce id velit ut. Nisi lacus sed viverra te
llus in. Sed risus ultricies tristique nulla aliquet enim tortor at. Non blandit massa enim nec. Sed
 cras ornare arcu dui vivamus. Turpis in eu mi bibendum neque egestas congue. Magna ac placerat vest
ibulum lectus mauris. Maecenas volutpat blandit aliquam etiam erat. A diam sollicitudin tempor id eu
 nisl. Egestas purus viverra accumsan in. Elementum nisi quis eleifend quam adipiscing vitae proin s
agittis.  In eu mi bibendum neque egestas congue quisque egestas. Volutpat diam ut venenatis tellus 
in metus vulputate eu. Ultrices in iaculis nunc sed augue lacus. Metus dictum at tempor commodo ulla
mcorper a lacus. Lectus mauris ultrices eros in cursus turpis massa. Tellus id interdum velit laoree
t id donec. In eu mi bibendum neque. Lectus urna duis convallis convallis tellus id. Purus faucibus 
ornare suspendisse sed nisi lacus sed viverra tellus. Mattis molestie a iaculis at erat pellentesque
. A scelerisque purus semper eget. Pretium viverra suspendisse potenti nullam. Tellus orci ac auctor
 augue mauris augue neque. Et leo duis ut diam quam. Pretium fusce id velit ut tortor pretium viverr
a suspendisse. Sit amet porttitor eget dolor morbi non arcu risus quis. Vitae auctor eu augue ut lec
tus. Sodales neque sodales ut etiam sit.  Ultricies lacus sed turpis tincidunt id aliquet risus. Sag
ittis vitae et leo duis ut diam quam. Velit scelerisque in dictum non consectetur a erat. Pharetra m
agna ac placerat vestibulum lectus mauris ultrices eros. Nascetur ridiculus mus mauris vitae ultrici
es. Volutpat ac tincidunt vitae semper. Neque volutpat ac tincidunt vitae. Ipsum nunc aliquet bibend
um enim facilisis gravida. Nibh tellus molestie nunc non blandit massa enim nec. Orci nulla pellente
sque dignissim enim sit amet venenatis. Pellentesque habitant morbi tristique senectus et netus et. 
 Interdum velit laoreet id donec ultrices tincidunt arcu non. Elit at imperdiet dui accumsan sit ame
t nulla. Eu turpis egestas pretium aenean. Pellentesque dignissim enim sit amet venenatis urna. Plac
erat duis ultricies lacus sed turpis tincidunt id aliquet. Massa placerat duis ultricies lacus sed t
urpis tincidunt id. Scelerisque eleifend donec pretium vulputate sapien. Morbi tristique senectus et
 netus et malesuada fames. Euismod lacinia at quis risus sed vulputate odio. Ullamcorper sit amet ri
sus nullam eget felis eget nunc lobortis. Fermentum leo vel orci porta. Nulla aliquet porttitor lacu
s luctus accumsan tortor posuere ac. Volutpat consequat mauris nunc congue nisi vitae suscipit tellu
s. Mi eget mauris pharetra et ultrices neque.  Non tellus orci ac auctor augue mauris augue. Urna et
 pharetra pharetra massa massa. Facilisi nullam vehicula ipsum a arcu cursus. Nisi scelerisque eu ul
trices vitae. In iaculis nunc sed augue lacus viverra vitae. Est velit egestas dui id ornare arcu. E
t molestie ac feugiat sed lectus vestibulum mattis. Ut eu sem integer vitae. Placerat duis ultricies
 lacus sed. Et tortor at risus viverra adipiscing at in tellus. Maecenas ultricies mi eget mauris ph
aretra et ultrices neque ornare. Lectus nulla at volutpat diam ut venenatis tellus. Netus et malesua
da fames ac turpis egestas sed tempus urna. Ac ut consequat semper viverra nam libero justo laoreet.
 Sed libero enim sed faucibus turpis in eu mi bibendum. Imperdiet dui accumsan sit amet nulla facili
si morbi.

*/

module.exports = bot => {
    bot.on('message', msg => {
        if (msg.author.username == bot.user.tag) {
            return
        }

        content = "";
        var attach;
        key = msg.content.toLowerCase(); // The message in all lowercase

        // I love you, not that bad, and Paul is
        if (key.includes('i love you')) {
            if (msg.author.discriminator == config.usernames.paul) {
                content += "LOVE YOU TOO :heart: :heart_eyes: :heartpulse:";
            } else {
                content += "I love Paul, did you know that!?";
            }
        } else if (key.includes('not that bad')) {
            content += 'You sure about that? It\'s pretty bad'
        } else if (key.includes('paul is')) {
            content += 'I don\'t have any time for any gossip now'
        }

        // When Paul is talking about Emma
        if (key.includes('emma ') && msg.author.discriminator == config.usernames.paul) {
            if (content.length > 0) {
                content += "\n And "
            }
            content += "Paul, stop talking about me! :blush:"
        }

        // Cars
        if (key.includes('in a car') || key.includes('in the car')) {
            if (content.length > 0) {
                content += "\n Psst..."
            }
            if (msg.author.discriminator == config.usernames.paul) {
                content += "Your driving isn't safe, though..."
            } else if (msg.author.discriminator == config.usernames.samuel) {
                content += "HEY STOP TEXTING AND DRIVING... oh wait, you're not Paul. Carry on ;)"
            } else {
                content += "At least your driving seems alright."
            }
        }

        // Images
        if (key.includes('dress')) {
            attach = new Discord.Attachment("generates/dress.png")
        } else if (key.includes('nissan')) {
            attach = new Discord.Attachment("generates/nissan.png")
        }

        // Reply if there's something to reply with
        if (content.length > 0 || attach != null) {
            msg.reply(content, file = attach);
        }
    });
}