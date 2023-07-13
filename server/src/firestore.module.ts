import * as admin from 'firebase-admin';
import { OnModuleInit } from '@nestjs/common';
import { RolesModule } from './modules/roles/role.module';
import { AccessControlModule, RolesBuilder } from 'nest-access-control';

let adminConfig = {
  projectId: 'egd-admin',
  privateKey: `-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCdVfKk4w8xFURM\njwXr/NZClAfXJVJ5GvsL86oWpLjZ++SM/7ofbgSN6KxSvZCR3+h3cqXwH/bhes8s\nhmXDUE0y13hS8H4cOTUY6tITpy0mvZp8x3p6HGlsi+L2uAG/jHbA+hth5yoGVimH\nW/3cWsOaWlKITAiCIEQFrzu5Q0wwzTEQt7N8vqlwLw+9iJUWR3917bDsVXJND/M+\nQj+iqrMuB6H8pMfvqnxWApITC0B/8zJ6Z2iUjN8zfMcnfa6Y1cHnL2amqkGJuNNI\nFpcN2uXH2FBTCrZXGw9lgCmhAFex5s0SWdjpAZtD9BR7k5ExEyLfMP0t2ci5J9Us\nEgJSq3kzAgMBAAECggEATdLyp87Md+neE8R3GGjDDsGsMyZ56f+HiDzpuDOYX/Kx\n9XCU/vDrfcpGWtL7jLxlf5gNLn6RHq0hhxOfiIHS/cAI+3WL26gMdJvKeAAsXEpS\n/T+qfHZLS27SQFl6O+Zd40yTeNTgO6wo9JRzOKkIsfPVeSeq2breCrXH4/a+3DAM\ndcgkkZyoAgmGxbrNK0GZZ++04k/4DmSjcrmhIvihucS3K+adZIgJscJuhc46v0Ma\nuuPEouGnW9JTBF1ABrRrlCWiwBpjgWBiMSc9OCH2NnvfDqYyV1qtgQncO5+0YpuQ\nRIahsXx2do0jipe1b1T7KScy+XQVCWJCkIs08LP30QKBgQDJ932I7usL0QvtIz94\n5hklaW/sJ5JvDiyJ4X1Y5BVjK0fO1SZhqYyJ+1r2M9/xkZBEHW9EvucnY1l/9NP9\nkJ4362uTbkL0WIYLnzb/wRclPSRvbJXAgc951Fw7/YP1SqiZ6YyseUfAG+OUUBkd\nEfWxKRdnGPFkBgB2ls0ezGWRiQKBgQDHbbiouEmZ65m+OodhJSiW7FlnaLblR/7/\nU0Sxcz0q6DQmQiXrDe8FOMyEhKeYpYt7lDinse802hEjyCshMeDjzvJ/aRqRjySd\nrrCt6gimyS8LkGh9qKcg4bw0q0vtghHd1qgeYvaLrhjW2bW6nFP4Pr+VBK/Mhu+F\nin3KmBbx2wKBgHrb5e61wCAZE9M2vPbTqnpasG4NCIQsMCXUGMdJQEVqX61PdqC0\nXjzVvdjFZ7Zw4Ty+VyCPrNgGFLzE92xpXAYSXQd7bJltfGV3fiKImIbbsd1iRZqs\nnMS0zULlDi/aMcQnEZ8dy+ruTDu9mflYIoiZwZXC050QFZoOVEsm9aZZAoGAJtc7\ny8B4tT2pp98GVulByoMltnoyhN1M0LWK/3SOSTkITxs6/1irYLz7OCQN8DDtxZfM\noPyKtiRyiiGGJOTuA/BeUmpJ/md+nidTyct2++TbAMmTUEX0pvbQDQH/u7ZFfIs+\nGwzzL6kstUuZlUq1H/g4n/FVu+Pb6opajYapkVkCgYAMYGc3rxCNyavW4fYQYLGk\nDYqFstmyFmoM7hRVyo5KfU4ZFB3OzE63HGXCXj/tJ2o3KN/A5oVLYmoUBnfxkTbN\nlMH2rc8fZGr/UnTGAuTiiU8n0dymushjVQi8AwfWNbu3ol9LNvQUk7160A1GgrDl\n8IhjduHKxQM5TyccRNC9SA==\n-----END PRIVATE KEY-----\n`,
  clientEmail: 'firebase-adminsdk-uvngr@egd-admin.iam.gserviceaccount.com'
};

export class RolesService implements OnModuleInit {
  async onModuleInit() {
    admin.initializeApp({
      credential: admin.credential.cert(adminConfig)
    });
    const firestore = admin.firestore();
    const collectionRef = firestore.collection('groups');

    let permissions = [];
    collectionRef.onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        let { name, roles } = doc.data();
        if (roles && roles.length > 0) {
          roles.map((role) => {
            permissions.push({
              role: name,
              resource: role.resource,
              action: role.action
            });
          })
        };
      });
      console.log(permissions);
    });
  }
};