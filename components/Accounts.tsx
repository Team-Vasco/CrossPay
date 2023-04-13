import {link} from 'fs';
import React, {useState, useEffect, useCallback} from 'react';
import {
  Platform,
  SafeAreaView,
  FlatList,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {PlaidLink, LinkExit, LinkSuccess} from 'react-native-plaid-link-sdk';

var styles = require('./style');

const Accounts = ({navigation}: any) => {
  const [linkToken, setLinkToken] = useState(null);
  const [success, setSuccess] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const address = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';

  const createLinkToken = useCallback(async () => {
    await fetch(`http://${address}:8080/api/create_link_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({address: address}),
    })
      .then(response => response.json())
      .then(data => {
        setLinkToken(data.link_token);
      })
      .catch(err => {
        console.log(err);
      });
  }, [setLinkToken]);

  // Fetch account data
  const getAccounts = useCallback(async () => {
    await fetch(`http://${address}:8080/api/balance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        // if (accounts.length === 0) {
        //   setAccounts(data.accounts.accounts);
        // } else {
        //   let newAccounts = accounts;
        //   data.accounts.accounts.forEach(account => {
        //     newAccounts.push(account);
        //   });
        //   setAccounts(newAccounts);
        // }
        let finalAccounts = accounts;
        let newAccounts = data.accounts.accounts;
        newAccounts.forEach(account => {
          finalAccounts.push(account);
        });
        setAccounts(finalAccounts);
        setRefresh(!refresh);
      })
      .catch(err => {
        console.log(err);
      });
  });

  useEffect(() => {
    if (accounts == null && success) {
      getAccounts();
    }
  }, [accounts]);

  useEffect(() => {
    if (linkToken == null) {
      createLinkToken();
    }
  }, [linkToken]);

  type ItemProps = {name: string};
  const Account = ({name}: ItemProps) => (
    <View style={styles.flatListItem}>
      <Text style={styles.flatListItemText}>{name}</Text>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={styles.flatListContainer}>
        <FlatList
          data={accounts}
          renderItem={({item}) => <Account name={item.name} />}
          keyExtractor={item => item.account_id}
          extraData={refresh}
        />
      </SafeAreaView>
      <View style={styles.bottom}>
        <PlaidLink
          tokenConfig={{
            token: linkToken,
            noLoadingState: false,
          }}
          onSuccess={async (success: LinkSuccess) => {
            await fetch(`http://${address}:8080/api/exchange_public_token`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({public_token: success.publicToken}),
            }).catch(err => {
              console.log(err);
            });
            setSuccess(true);
            getAccounts();
          }}
          onExit={(response: LinkExit) => {
            console.log(response);
          }}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Add Account</Text>
          </View>
        </PlaidLink>
      </View>
    </View>
  );
};

export default Accounts;
