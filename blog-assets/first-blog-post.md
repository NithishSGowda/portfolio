---
title: "Building a Home SOC: Automating Threat Detection with Wazuh and ELK"
subtitle: "A practical guide to setting up an enterprise-grade Security Operations Center in your home lab for under $50."
tags: ["Cybersecurity", "SOC", "Blue Team", "Homelab", "Wazuh"]
cover_image: "" # Upload a dark, tech-themed thumbnail here!
---

**TL;DR:** I built a fully functional Security Operations Center (SOC) using open-source tools (Wazuh and ELK Stack) to monitor my home network. This setup detected and alerted me to a simulated brute-force attack within 3 seconds. Here is the step-by-step architecture and configuration.

---

## The Problem

When applying for SOC Analyst or Security Engineering roles, reading about SIEMs is not enough. You need hands-on experience parsing logs, writing detection rules, and tuning out noise. I wanted an environment where I could safely detonate malware and monitor the exact telemetry.

## The Architecture

Here is how the data flows in my home lab:

```mermaid
graph TD
    A[Windows Endpoint (Victim)] -->|Wazuh Agent| B(Wazuh Manager)
    C[Linux Server (Web/DB)] -->|Wazuh Agent| B
    B -->|Filebeat| D[Elasticsearch]
    D --> E[Kibana Dashboard]
    B -->|Webhook| F[Discord Alerting]
```

### Key Components:
1. **Wazuh:** Acts as both the Endpoint Detection and Response (EDR) agent and the central manager.
2. **Elasticsearch:** The indexing engine where all the logs are stored.
3. **Kibana:** The visualization layer to build dashboards and hunt through logs.

---

## Step 1: Provisioning the Infrastructure

I used a single Proxmox node to host the VMs. If you don't have a hypervisor, you can use DigitalOcean or Linode droplets.

**Minimum Specs for the SIEM VM:**
- 4 vCPUs
- 8GB RAM (Elasticsearch is hungry!)
- 50GB Storage

## Step 2: Installing Wazuh

Instead of installing Wazuh, Elasticsearch, and Kibana manually, Wazuh provides an all-in-one installation script. 

Run this on your Ubuntu 22.04 server:

```bash
curl -sO https://packages.wazuh.com/4.5/wazuh-install.sh
sudo bash ./wazuh-install.sh -a
```

*Wait about 15-20 minutes.* The script will output your admin credentials at the end. **Save these.**

## Step 3: Deploying the Agents

To monitor my Windows machine, I navigated to the Wazuh Dashboard > Add Agent. 
Run the provided PowerShell command as Administrator on the target machine:

```powershell
Invoke-WebRequest -Uri https://packages.wazuh.com/4.x/windows/wazuh-agent-4.5.3-1.msi -OutFile ${env:tmp}\wazuh-agent.msi; msiexec.exe /i ${env:tmp}\wazuh-agent.msi /q WAZUH_MANAGER='192.168.1.100' WAZUH_REGISTRATION_SERVER='192.168.1.100'
NET START WazuhSvc
```

*(Replace `192.168.1.100` with your Wazuh Manager IP).*

---

## Simulating an Attack (Validation)

To prove the SOC works, I simulated an SSH brute-force attack from a Kali Linux VM against one of my monitored Linux servers using Hydra:

```bash
hydra -l root -P rockyou.txt ssh://192.168.1.101
```

### The Result

Within seconds, the Wazuh dashboard lit up. The active response module kicked in, identifying `Rule ID 5712` (sshd: brute force trying to get access to the system). Because Wazuh correlates logs, it recognized the rapid succession of failed logins and temporarily dropped the attacker's IP using `iptables`.

> **Business Impact:** In a corporate environment, this automated active response prevents unauthorized access and alerts the on-call analyst immediately, reducing the Mean Time to Respond (MTTR).

---

## Next Steps

This is just the foundation. In part 2 of this series, I will cover:
1. Writing custom YARA rules to detect specific malware signatures.
2. Integrating Threat Intelligence feeds (like AbuseIPDB) into the Wazuh manager.
3. Setting up automated Telegram/Discord alerts via webhooks.

*I'm currently seeking roles in Security Engineering and SOC operations. If your team is hiring, feel free to connect with me on [LinkedIn](#) or view my [Portfolio](https://nithishsgowda-portfolio.netlify.app/).*
